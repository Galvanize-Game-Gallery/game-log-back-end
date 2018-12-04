select ugp.*, users.username, games.title, platforms.name  from user_games_platform ugp
inner join user_platforms on ugp.u_p_id = user_platforms.id
inner join platform_games on ugp.p_g_id = platform_games.id
inner join platforms on user_platforms.platform_id = platforms.igdb_id
inner join users on user_platforms.user_id = users.id
inner join games on platform_games.game_id = games.igdb_id;

select ugp.id, up.user_id, pg.game_id, pg.platform_id, ugp.p_g_id, ugp.u_p_id from user_games_platform ugp
    inner join user_platforms up on up.id = ugp.u_p_id
    inner join platform_games pg on pg.id = ugp.p_g_id
    where pg.platform_id = 6 and up.user_id = 1;