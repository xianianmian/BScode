CREATE TABLE `bsUserInfo` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `username` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '用户名',
    `password` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '密码',
    `avatarUrL` VARCHAR(255) COMMENT '用户头像URL',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';
