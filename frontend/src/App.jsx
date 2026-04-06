import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050/api/messages'
const CURRENT_USER = 'User1'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [menuId, setMenuId] = useState(null)

  const fetchMessages = async () => {
    const res = await axios.get(API)
    setMessages(res.data)
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    await axios.post(API, { content: input, sender: CURRENT_USER })
    setInput('')
    fetchMessages()
  }

  const deleteMessage = async (id, type) => {
    await axios.patch(`${API}/${id}/delete`, { type, user: CURRENT_USER })
    setMenuId(null)
    fetchMessages()
  }

  const pinMessage = async (id) => {
    await axios.patch(`${API}/${id}/pin`)
    setMenuId(null)
    fetchMessages()
  }

  const visibleMessages = messages.filter(
    m => !m.deletedForEveryone && !m.deletedFor.includes(CURRENT_USER)
  )

  const pinnedMessages = visibleMessages.filter(m => m.pinned)
  const regularMessages = visibleMessages.filter(m => !m.pinned)

  return (
    <div className="app">
      <div className="header">
        <h2>💬 Adverayze Chat</h2>
        <span className="user-badge">{CURRENT_USER}</span>
      </div>

      {pinnedMessages.length > 0 && (
        <div className="pinned-section">
          <div className="pinned-title">📌 Pinned Messages</div>
          {pinnedMessages.map(m => (
            <div key={m._id} className="pinned-msg">
              <strong>{m.sender}:</strong> {m.content}
            </div>
          ))}
        </div>
      )}

      <div className="chat-box">
        {regularMessages.map(m => (
          <div
            key={m._id}
            className={`message ${m.sender === CURRENT_USER ? 'mine' : 'theirs'}`}
          >
            <div className="bubble">
              <div className="sender">{m.sender}</div>
              <div className="content">{m.content}</div>
              <div className="time">
                {new Date(m.timestamp).toLocaleTimeString()}
              </div>
            </div>
            <button className="menu-btn" onClick={() => setMenuId(menuId === m._id ? null : m._id)}>⋮</button>
            {menuId === m._id && (
              <div className="menu">
                <button onClick={() => deleteMessage(m._id, 'me')}>🗑 Delete for Me</button>
                <button onClick={() => deleteMessage(m._id, 'everyone')}>❌ Delete for Everyone</button>
                <button onClick={() => pinMessage(m._id)}>{m.pinned ? '📌 Unpin' : '📌 Pin'}</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App