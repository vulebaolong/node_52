// tạo image
// docker build -t img-be_cyber_community .

// chạy container
// docker run  --name con-be_cyber_community -p 3070:3069 -d --env-file .env img-be_cyber_community

// stop container
// docker stop con-be_cyber_community

// xoá container
// docker rm con-be_cyber_community

// restart container
// docker restart con-be_cyber_community

// xoá image
// docker rmi img-be_cyber_community

// lấy địa chỉ IP của container
// docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_DB_SQL_container

// chạy docker compose
// docker compose up -d

//  lệnh ubuntu


// show tất cả file folder đang có
// ls -la

// tạo folder
// mkdir actions-runner

// di chuyển vào folder
// cd actions-runner

// list ra tất cả container đang chạy
// docker ps

// list ra tất cả container (kể cả đã dừng)
// docker ps -a


// map domain

/**
sudo apt update
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default

nhấn tổ hợp phím ctrl + K => để xoá dòng cho nhanh


kiểm tra cấu hình
sudo nginx -t

khởi động lại nginx
sudo systemctl restart nginx

 */