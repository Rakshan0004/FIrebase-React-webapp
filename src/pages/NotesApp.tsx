


import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: any;
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const notesCollection = collection(firestore, "notes");

  // Load notes when component mounts
  useEffect(() => {
    loadNotes();
  }, []);

  // READ: Fetch all notes from Firebase
  const loadNotes = async () => {
    try {
      setLoading(true);
      const q = query(notesCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const loadedNotes: Note[] = [];
      snapshot.forEach((doc) => {
        loadedNotes.push({
          id: doc.id,
          ...doc.data(),
        } as Note);
      });

      setNotes(loadedNotes);
      console.log("✅ Loaded notes:", loadedNotes);
    } catch (error) {
      console.error("❌ Error loading notes:", error);
      alert("Failed to load notes!");
    } finally {
      setLoading(false);
    }
  };

  // CREATE: Add new note to Firebase
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content!");
      return;
    }

    try {
      setLoading(true);
      await addDoc(notesCollection, {
        title: title,
        content: content,
        createdAt: serverTimestamp(),
      });

      console.log("✅ Note added successfully!");

      // Clear form
      setTitle("");
      setContent("");

      // Reload notes
      await loadNotes();
    } catch (error) {
      console.error("❌ Error adding note:", error);
      alert("Failed to add note!");
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Remove note from Firebase
  const handleDeleteNote = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      setLoading(true);
      await deleteDoc(doc(firestore, "notes", id));
      console.log("✅ Note deleted successfully!");

      // Reload notes
      await loadNotes();
    } catch (error) {
      console.error("❌ Error deleting note:", error);
      alert("Failed to delete note!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📝 Simple Notes App</h1>
      <p style={styles.subtitle}>Testing Firebase Firestore</p>

      {/* Add Note Form */}
      <div style={styles.formContainer}>
        <h2>Add New Note</h2>
        <form onSubmit={handleAddNote}>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            disabled={loading}
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            rows={4}
            disabled={loading}
          />
          <button type="submit" style={styles.addButton} disabled={loading}>
            {loading ? "Adding..." : "➕ Add Note"}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div style={styles.notesContainer}>
        <h2>Your Notes ({notes.length})</h2>

        {loading && <p>Loading...</p>}

        {!loading && notes.length === 0 && (
          <p style={styles.emptyMessage}>
            No notes yet. Create your first note above! 👆
          </p>
        )}

        {!loading &&
          notes.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              <div style={styles.noteHeader}>
                <h3 style={styles.noteTitle}>{note.title}</h3>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  style={styles.deleteButton}
                  disabled={loading}
                >
                  🗑️ Delete
                </button>
              </div>
              <p style={styles.noteContent}>{note.content}</p>
              <small style={styles.timestamp}>
                {note.createdAt?.toDate
                  ? new Date(note.createdAt.toDate()).toLocaleString()
                  : "Just now"}
              </small>
            </div>
          ))}
      </div>

      {/* Test Instructions */}
      <div style={styles.instructions}>
        <h3>🧪 Test Instructions:</h3>
        <ol>
          <li>Add a note and check your Firebase Console</li>
          <li>Refresh the page - notes should still be there!</li>
          <li>Open in another browser/tab - same notes appear</li>
          <li>Delete a note and see it disappear everywhere</li>
        </ol>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center" as const,
    color: "#333",
  },
  subtitle: {
    textAlign: "center" as const,
    color: "#666",
    marginBottom: "30px",
  },
  formContainer: {
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box" as const,
  },
  addButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  notesContainer: {
    marginTop: "20px",
  },
  emptyMessage: {
    textAlign: "center" as const,
    color: "#999",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  noteCard: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "15px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  noteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  noteTitle: {
    margin: "0",
    color: "#333",
  },
  noteContent: {
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "10px",
  },
  timestamp: {
    color: "#999",
    fontSize: "12px",
  },
  deleteButton: {
    padding: "8px 16px",
    backgroundColor: "#ff4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  instructions: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "black",
    borderRadius: "8px",
    borderLeft: "4px solid #2196F3",
  },
};