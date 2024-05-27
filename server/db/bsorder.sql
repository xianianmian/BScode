CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT,
    IsReviewed BOOLEAN,
    IsPaid BOOLEAN,
    OrderTime DATETIME,
    TotalPrice FLOAT,
    PRIMARY KEY (OrderID)
) ENGINE=InnoDB;