import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useRef, useEffect } from 'react'

export default function UserModel({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [previewImage, setPreviewImage] = useState(user?.avatarUrl || '/avatars/avatar.jpg');
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch user data from API
    fetch("/api/get-user-profile")
      .then(response => response.json())
      .then(data => {
        setFormData({ username: data.username, email: data.email });
        setPreviewImage(data.avatarUrl || '/avatars/avatar.jpg');
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    if (fileInputRef.current.files[0]) {
      formDataToSend.append('avatar', fileInputRef.current.files[0]);
    }

    fetch("/api/update-profile", {
      method: "POST",
      body: formDataToSend,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Profile updated:", data);
        setIsOpen(false); // Close the modal
      })
      .catch(error => console.error("Error updating profile:", error));
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white">
        Edit Profile
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                Edit Profile
              </DialogTitle>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setPreviewImage(reader.result);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold text-gray-700" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-semibold text-gray-700" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm bg-gray-200 rounded-md">
                    Cancel
                  </Button>
                  <Button type="submit" className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md">
                    Save
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
