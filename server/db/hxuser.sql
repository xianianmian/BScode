-- 创建用户表
CREATE TABLE `sys_user` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
    `username` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '登录帐号，邮箱或手机号',
    `password` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '登录密码',
    PRIMARY KEY (`id`) USING BTREE,
	  UNIQUE KEY `username_UNIQUE` (`username`)
)