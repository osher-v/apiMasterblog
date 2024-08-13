
# Blog Posts API

This project is a simple API for managing blog posts. It allows clients to create, read, update, delete, and search blog posts, as well as sort them based on specific criteria.

## Features

- **Create a Post:** Add a new blog post with a title and content.
- **Retrieve Posts:** Get a list of all blog posts.
- **Update a Post:** Modify the title or content of an existing post.
- **Delete a Post:** Remove a blog post by its ID.
- **Search Posts:** Find posts by title or content using query parameters.
- **Sort Posts:** Sort posts by title or content in ascending or descending order.

## API Endpoints

### 1. Retrieve All Posts

- **Endpoint:** `/api/posts`
- **Method:** `GET`
- **Description:** Returns a list of all blog posts. Supports sorting by title or content.

**Query Parameters:**
- `sort` (optional): The field to sort by (`title` or `content`).
- `direction` (optional): The direction of sorting (`asc` for ascending, `desc` for descending).

**Example:**
```http
GET /api/posts?sort=title&direction=asc
```

### 2. Retrieve a Single Post by ID

- **Endpoint:** `/api/posts/<int:id>`
- **Method:** `GET`
- **Description:** Returns a single post by its ID.

### 3. Create a New Post

- **Endpoint:** `/api/posts`
- **Method:** `POST`
- **Description:** Creates a new blog post.

**Body Parameters:**
- `title`: The title of the post (string, required).
- `content`: The content of the post (string, required).

**Example:**
```json
{
    "title": "My New Post",
    "content": "This is the content of the post."
}
```

### 4. Update an Existing Post

- **Endpoint:** `/api/posts/<int:id>`
- **Method:** `PUT`
- **Description:** Updates the title or content of an existing post.

**Body Parameters:**
- `title` (optional): The new title of the post.
- `content` (optional): The new content of the post.

**Example:**
```json
{
    "title": "Updated Post Title",
    "content": "This is the updated content of the post."
}
```

### 5. Delete a Post

- **Endpoint:** `/api/posts/<int:id>`
- **Method:** `DELETE`
- **Description:** Deletes a post by its ID.

### 6. Search Posts

- **Endpoint:** `/api/posts/search`
- **Method:** `GET`
- **Description:** Searches for posts by title or content.

**Query Parameters:**
- `title` (optional): The title to search for.
- `content` (optional): The content to search for.

**Example:**
```http
GET /api/posts/search?title=flask&content=python
```

## Error Handling

- The API returns appropriate status codes and error messages for invalid requests, such as:
  - `400 Bad Request` for invalid sort fields or directions.
  - `404 Not Found` when a post ID does not exist.

## How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/blog-posts-api.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd blog-posts-api
   ```

3. **Install dependencies:**
   Ensure you have `Flask` and `Flask-CORS` installed:
   ```bash
   pip install flask flask-cors
   ```

4. **Run the application:**
   ```bash
   python backend_app.py
   ```

5. **Access the API:**
   The API will be running at `http://127.0.0.1:5002/api/posts`.

## Testing with Postman

Use Postman or any other API client to interact with the endpoints listed above. You can create, retrieve, update, delete, search, and sort blog posts through the provided endpoints.
