document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes-container');
    const searchInput = document.getElementById('search-notes');
    const filterTags = document.getElementById('filter-tags');
    
    // Load all notes
    function loadNotes(searchTerm = '', selectedTag = '') {
        let query = firebase.firestore().collection('notes').orderBy('createdAt', 'desc');
        
        // Apply search filter if term exists
        if (searchTerm) {
            query = query.where('title', '>=', searchTerm)
                         .where('title', '<=', searchTerm + '\uf8ff');
        }
        
        // Apply tag filter if selected
        if (selectedTag) {
            query = query.where('tags', 'array-contains', selectedTag);
        }
        
        query.get()
            .then(snapshot => {
                notesContainer.innerHTML = '';
                const tagsSet = new Set();
                
                if (snapshot.empty) {
                    notesContainer.innerHTML = '<p>No notes found</p>';
                    return;
                }
                
                snapshot.forEach(doc => {
                    const note = doc.data();
                    displayNote(note);
                    
                    // Collect all tags for filter dropdown
                    if (note.tags) {
                        note.tags.forEach(tag => tagsSet.add(tag));
                    }
                });
                
                // Update tag filter dropdown
                updateTagFilter(Array.from(tagsSet));
            })
            .catch(error => {
                console.error('Error loading notes: ', error);
                notesContainer.innerHTML = '<p>Error loading notes. Please try again.</p>';
            });
    }
    
    // Display a single note
    function displayNote(note) {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        
        const tagsHtml = note.tags && note.tags.length > 0 
            ? `<div class="note-tags">${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
            : '';
        
        noteCard.innerHTML = `
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content">${note.content}</p>
            ${tagsHtml}
            <div class="note-meta">
                <span>By ${note.author}</span>
                <span>${note.createdAt?.toDate().toLocaleDateString() || 'Unknown date'}</span>
            </div>
        `;
        
        notesContainer.appendChild(noteCard);
    }
    
    // Update tag filter dropdown
    function updateTagFilter(tags) {
        // Keep the current selected value
        const currentValue = filterTags.value;
        
        // Clear existing options except the first one
        while (filterTags.options.length > 1) {
            filterTags.remove(1);
        }
        
        // Add new tags
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            filterTags.appendChild(option);
        });
        
        // Restore the selected value if it still exists
        if (currentValue && tags.includes(currentValue)) {
            filterTags.value = currentValue;
        }
    }
    
    // Event listeners
    search
