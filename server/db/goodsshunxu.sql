CREATE TABLE `goodsshunxu` (
  `userid` BIGINT(20) NOT NULL COMMENT '用户id', -- 用户id应该不会为空
  `shunxu` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '推荐商品顺序', -- 这个字段可以有默认值
  PRIMARY KEY (`userid`) -- 添加主键，确保`userid`的唯一性
);
