Toy Library v0.5

- browse all toys
- toy detail page
- borrow form
- local toy images
- simple MySQL database
- basic search by name if time allows

```
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        age_group VARCHAR(50),
        tags VARCHAR(255),
        image_path VARCHAR(255),
        is_available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP



CREATE TABLE borrow_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  toy_id INT NOT NULL,
  borrower_name VARCHAR(100) NOT NULL,
  borrower_email VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (toy_id) REFERENCES toys(id)
);
```
