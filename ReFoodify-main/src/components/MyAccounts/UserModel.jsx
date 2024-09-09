import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useRef } from 'react'


export default function UserModel({user}) {
  let [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  })
  const [previewImage, setPreviewImage] = useState(user?.avatarUrl || '/avatars/avatar.jpg')
  const fileInputRef = useRef(null)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Implement API call to update user data
    console.log('Submitting:', formData)
    console.log('New avatar:', fileInputRef.current.files[0])
    close()
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Edit Profile
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            >
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
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block p-3 w-full rounded-md border border-green-500 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block p-3 border w-full rounded-md border-green-500 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
            
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                    onClick={close}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="inline-flex justify-center rounded-md border bg-[#BC890C] px-4 py-2 text-sm font-medium text-white hover:bg-[#A67A0B]"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
