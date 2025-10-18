import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;

// chỉ log khi dev để kiểm tra
// khi lên prod phải tắt đi
console.log(
    "\n",
    {
        DATABASE_URL: DATABASE_URL,
    },
    "\n"
);
