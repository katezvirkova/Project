import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BookmarkForm from './components/BookmarkForm';
import BookmarkList from './components/BookmarkList';
import Register from './components/Register';
import Login from './components/Login';
import './styles.css';

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Функція для отримання закладок
  const fetchBookmarks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/bookmarks/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  // Функція для отримання категорій
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/categories/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // **Оголошення функції `handleAddCategory`**
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; // Якщо нова категорія порожня, нічого не робити

    try {
      const response = await fetch('http://127.0.0.1:8000/api/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        setNewCategory(''); // Очищення поля після додавання
        fetchCategories(); // Оновлення списку категорій
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('/'); // Переходить на головну сторінку після логіну
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    navigate('/login'); // Переходить на сторінку логіну після виходу
  };

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    if (showFavorites && !bookmark.favorite) return false;
    if (selectedCategory && bookmark.category && bookmark.category.id !== parseInt(selectedCategory)) return false;
    return true;
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({ username: 'User' });
      fetchCategories();
      fetchBookmarks();
    }
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Bookmarks Manager</h1>

      {user ? (
        <div>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div>
                <div>
                  <label htmlFor="category-select">Select Category:</label>
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <input
                    type="text"
                    placeholder="Add new category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button onClick={handleAddCategory}>Add Category</button>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <button onClick={() => setShowFavorites(!showFavorites)}>
                    {showFavorites ? 'Show All' : 'Show Favorites'}
                  </button>
                </div>

                <BookmarkForm fetchBookmarks={fetchBookmarks} categories={categories} />
                <BookmarkList
                  bookmarks={filteredBookmarks}
                  fetchBookmarks={fetchBookmarks}
                  categories={categories}
                />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
};

export default App;
