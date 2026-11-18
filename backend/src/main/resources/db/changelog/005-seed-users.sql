--liquibase formatted sql
--changeset tianmovie:005

-- Thêm tài khoản quản trị viên và khách hàng mẫu (mật khẩu gốc: 123456)
INSERT INTO users (email, password_hash, full_name, role, status)
VALUES
    (
        'admin@tianmovie.vn',
        '$2a$10$gTYwCN66/tBRoCr3.TXa1.v1iyvwIF7GRBqxzv7G.AHLMt/owXrp.',
        'Quản trị viên TianMovie',
        'super_admin',
        'active'
    ),
    (
        'customer@gmail.com',
        '$2a$10$gTYwCN66/tBRoCr3.TXa1.v1iyvwIF7GRBqxzv7G.AHLMt/owXrp.',
        'Khách Hàng Mẫu',
        'customer',
        'active'
    );