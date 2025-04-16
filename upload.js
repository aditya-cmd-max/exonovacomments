document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const submitBtn = document.getElementById('submit-btn');
    
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Check if user is logged in
        const user = firebase.auth().currentUser;
        if (!user) {
            alert('Please login to upload notes');
            document.getElementById('login-btn').click();
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';
        
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;
        const tags = document.getElementById('note-tags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        
        const noteData = {
            title,
            content,
            tags,
            author: user.email,
            authorId: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        // Add note to Firestore
        firebase.firestore().collection('notes').add(noteData)
            .then(() => {
                alert('Note uploaded successfully!');
                noteForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Upload Note';
            })
            .catch(error => {
                alert('Error uploading note: ' + error.message);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Upload Note';
            });
    });
});
