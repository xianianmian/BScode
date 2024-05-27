CREATE TABLE ProductDetails  (
    ProductID INT AUTO_INCREMENT,
    OrderID INT,
    ProductName VARCHAR(255),
    Description TEXT,
    City VARCHAR(100),
    PurchaseTime DATETIME,
    IsReviewed BOOLEAN,
    IsPaid BOOLEAN,
    Quantity INT,
    IsSelected BOOLEAN,
    ImageURL VARCHAR(255),
    IsFavorited BOOLEAN,
    Price FLOAT,
    StarRating INT,
    Category VARCHAR(100),
    PRIMARY KEY (ProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
) ENGINE=InnoDB;