
const ConfirmModal = ({onConfirm, onCancel}) => {
  
  return (
    <>
        <div className="bg-slate-500/80 h-screen w-full fixed inset-0 flex justify-center items-center">
        <div className="border border-slate-300 bg-white rounded-md p-2">
            <h3>This cant be undone</h3>
            <div>
                <button onClick={onCancel} className="border border-slate-300">Cancel</button>
                <button onClick={onConfirm} className="border border-slate-300">Delete</button>
            </div>
        </div>
    </div>
   
  </>
  )
}

export default ConfirmModal