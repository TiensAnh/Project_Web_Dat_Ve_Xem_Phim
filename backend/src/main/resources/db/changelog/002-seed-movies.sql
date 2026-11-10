--liquibase formatted sql
--changeset tianmovie:002

INSERT INTO genres (name)
VALUES
    ('Hành động'),
    ('Phiêu lưu'),
    ('Hoạt hình');

INSERT INTO movies (slug, title, duration_minutes, age_rating, status, release_date)
VALUES
    ('duong-dua-cuoi-cung', 'Đường đua cuối cùng', 112, 'T13', 'now_showing', '2026-11-06'),
    ('hon-dao-tren-may', 'Hòn đảo trên mây', 95, 'P', 'now_showing', '2026-11-06'),
    ('vuot-qua-sa-mac', 'Vượt qua sa mạc', 104, 'T13', 'coming_soon', '2026-11-27');

INSERT INTO movie_genres (movie_id, genre_id)
SELECT movies.id, genres.id
FROM (
         VALUES
             ('duong-dua-cuoi-cung', 'Hành động'),
             ('duong-dua-cuoi-cung', 'Phiêu lưu'),
             ('hon-dao-tren-may', 'Hoạt hình'),
             ('vuot-qua-sa-mac', 'Phiêu lưu')
     ) AS pairs (movie_slug, genre_name)
         JOIN movies ON movies.slug = pairs.movie_slug
         JOIN genres ON genres.name = pairs.genre_name;