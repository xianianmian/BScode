CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tname VARCHAR(255),
    txing INT DEFAULT 5,
    tdetail TEXT,
    tcity VARCHAR(100),
    tavartar VARCHAR(255),
    tlove BOOLEAN DEFAULT true,
    tprice FLOAT,
    tzhonglei VARCHAR(100),
    num INT
);
