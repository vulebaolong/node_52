import { isUUID } from "class-validator";

type FieldKind = "uuidv7" | "text" | "number" | "boolean" | "date" | "enum";
type FieldKinds = Record<string, FieldKind>;

interface BaseQueryDto {
    page?: number | string;
    pageSize?: number | string;
    filters?: Record<string, unknown>;
    sortBy?: string; // ví dụ: "id" | "createdAt" | ...
    isDesc?: boolean; // true => desc
    afterUUIDv7?: string; // nếu truyền => bật chế độ cursor
    direction?: "next" | "prev"; // optional, mặc định "next"
}

/** 1) Chỉ xây where + orderBy (không đụng phân trang) */
export function buildWhereAndSort(query: BaseQueryDto, kinds: FieldKinds, allowedFields: string[] = Object.keys(kinds)) {
    let { filters, sortBy = "createdAt", isDesc } = query;

    const where: Record<string, any> = {};

    if (filters && typeof filters === "object") {
        for (const key of Object.keys(filters)) {
            if (!allowedFields.includes(key)) continue;

            const kind = kinds[key];
            const raw = (filters as any)[key];
            if (raw === "" || raw === null || raw === undefined) continue;

            // Date (YYYY-MM-DD)
            if (kind === "date") {
                const date = new Date(String(raw));
                if (!isNaN(+date)) {
                    const next = new Date(date);
                    next.setDate(next.getDate() + 1);
                    where[key] = { gte: date, lt: next };
                }
                continue;
            }

            // UUID v7
            if (kind === "uuidv7") {
                if (Array.isArray(raw)) {
                    const ids = raw.filter((v) => typeof v === "string" && isUUID(v, 7));
                    if (ids.length) where[key] = { in: ids };
                } else if (typeof raw === "string") {
                    const parts = raw
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => isUUID(s, 7));
                    if (parts.length > 1) where[key] = { in: parts };
                    else if (parts.length === 1) where[key] = parts[0];
                }
                continue;
            }

            // Number
            if (kind === "number") {
                const num = Number(raw);
                if (!Number.isNaN(num)) where[key] = num;
                continue;
            }

            // Boolean
            if (kind === "boolean") {
                const val = String(raw).toLowerCase();
                if (val === "true") where[key] = true;
                else if (val === "false") where[key] = false;
                continue;
            }

            // Enum
            if (kind === "enum") {
                if (Array.isArray(raw)) {
                    const values = raw.filter((v) => typeof v === "string");
                    if (values.length) where[key] = { in: values };
                } else if (typeof raw === "string") {
                    const parts = raw
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => !!s);
                    if (parts.length > 1) where[key] = { in: parts };
                    else if (parts.length === 1) where[key] = parts[0];
                }
                continue;
            }

            // Text (contains, insensitive)
            if (kind === "text" && typeof raw === "string") {
                where[key] = { contains: raw, mode: "insensitive" };
            }
        }
    }

    // Chống sortBy ngoài whitelist
    if (!allowedFields.includes(String(sortBy))) sortBy = "createdAt";

    // Đảm bảo orderBy ổn định (stable) bằng cách thêm "id" tie-breaker nếu sortBy != id
    const direction = isDesc ? ("desc" as const) : ("asc" as const);
    const orderByArray: any[] = sortBy === "id" ? [{ id: direction }] : [{ [sortBy]: direction }, { id: direction }];

    return { where, orderBy: orderByArray as Record<string, any>[] };
}

/** 2) Chỉ xây phần phân trang (offset hoặc cursor) */
export function buildPaginationClause(query: BaseQueryDto) {
    const pageNumber = +query.page! > 0 ? +query.page! : 1;
    const pageSizeNumber = +query.pageSize! > 0 ? +query.pageSize! : 10;

    const afterUUIDv7 = query.afterUUIDv7;
    const isStartValid = !!afterUUIDv7 && isUUID(String(afterUUIDv7), 7);
    const direction = query.direction ?? "next";

    // Nếu có afterUUIDv7 hợp lệ => dùng cursor pagination
    if (isStartValid) {
        // Prisma rule: dùng cursor + skip:1 để bỏ qua chính cursor
        // take dương = next, take âm = prev (quay ngược)
        const take = direction === "prev" ? -pageSizeNumber : pageSizeNumber;

        return {
            mode: "cursor" as const,
            cursor: { id: afterUUIDv7 },
            skip: 1,
            take,
            page: pageNumber, // giữ lại nếu bạn vẫn muốn trả về meta
            pageSize: pageSizeNumber,
        };
    }

    // Mặc định: offset pagination
    return {
        mode: "offset" as const,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        page: pageNumber,
        pageSize: pageSizeNumber,
    };
}

/** 3) Hàm tiện dụng “tất cả trong một”: where + orderBy + pagination */
export function buildPrismaQuery(query: BaseQueryDto, kinds: FieldKinds, allowedFields: string[] = Object.keys(kinds)) {
    const { where, orderBy } = buildWhereAndSort(query, kinds, allowedFields);
    const pagination = buildPaginationClause(query);
    return { where, orderBy, ...pagination };
}

// CÁCH SỬ DỤNG
//   async findAll(query: BaseQueryDto, user: AuthUser) {
//         let { where, orderBy, take, skip, cursor } = buildPrismaQuery(
//             query,
//             {
//                 id: "uuidv7",
//                 status: "text",
//                 slug: "text",
//                 title: "text",
//                 userId: "uuidv7",
//                 typeId: "uuidv7",
//                 variant: "enum",
//             },
//             ["userId", "title", "variant"],
//         );

//         where = {
//             ...where,
//             status: ArticleStatus.PUBLISHED,
//             isDeleted: false,
//         };

//         const [itemsWithoutContent, totalItem] = await Promise.all([
//             this.prisma.articles.findMany({
//                 where,
//                 orderBy,
//                 skip: skip,
//                 take: take,
//                 cursor: cursor,
//                 include: this.include(user.id),
//                 omit: {
//                     content: true,
//                 },
//             }),
//             this.prisma.articles.count({ where }),
//         ]);

//         const items = await this.getContentPost(itemsWithoutContent);

//         return {
//             page: query.page,
//             pageSize: query.pageSize,
//             totalItem,
//             totalPage: Math.ceil(totalItem / query.pageSize) || 1,
//             items: items || [],
//         };
//     }