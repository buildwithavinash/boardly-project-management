
const ConfirmModal = ({onConfirm, onCancel}) => {
  
  return (
    <>
        <div className="bg-slate-500/80 h-screen w-full fixed inset-0 flex justify-center items-center z-100">
        <div className="border border-slate-300 bg-white rounded-md p-4 relative">
          <button onClick={onCancel} className="border rounded-full h-6 w-6 flex justify-center items-center text-sm text-slate-600 absolute top-2 right-2 cursor-pointer">X</button>
            <h3 className="mt-6">This can't be undone</h3>
            <div className="flex gap-2 items-center justify-center mt-2">
                <button onClick={onCancel} className="border border-yellow-300 bg-yellow-50 text-yellow-500 px-2 rounded-md cursor-pointer">Cancel</button>
                <button onClick={onConfirm} className="border border-red-300 bg-red-50 text-red-500 px-2 rounded-md cursor-pointer">Delete</button>
            </div>
        </div>
    </div>
   
  </>
  )
}

export default ConfirmModal