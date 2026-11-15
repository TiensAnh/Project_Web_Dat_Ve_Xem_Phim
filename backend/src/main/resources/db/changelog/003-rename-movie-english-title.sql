--liquibase formatted sql
--changeset tianmovie:003

-- Đổi tên cột lưu tên phụ của phim.
ALTER TABLE movies RENAME COLUMN english_title TO sub_title;