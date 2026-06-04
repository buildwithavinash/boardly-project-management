import { CgDanger } from "react-icons/cg"
import { IoMdClose } from "react-icons/io"

const ConfirmModal = ({onConfirm, onCancel, message=`This can't be undone`}) => {
  
  return (
    <>
        <div className="bg-slate-500/80 h-screen w-full fixed inset-0 flex justify-center items-center z-100">
        <div className="border border-slate-300 bg-white rounded-md p-4 relative">
          <button onClick={onCancel} className="bg-slate-50 rounded-lg h-6 w-6 flex justify-center items-center text-sm text-slate-600 absolute top-2 right-2 cursor-pointer"><IoMdClose /></button>
          <div className="flex flex-col items-center pt-4">

          <span className="text-2xl text-red-500 mb-1"><CgDanger /></span>
          <h3 className="text-lg font-semibold text-slate-800">{message}</h3>
          <div className="flex gap-2 items-center justify-center mt-4">
            <button onClick={onCancel} className="border border-slate-300 font-semibold bg-slate-50 text-slate-600 px-4 py-1 rounded-sm cursor-pointer">Cancel</button>
            <button onClick={onConfirm} className="border border-red-300 bg-red-500 font-semibold text-white px-4 py-1 rounded-sm cursor-pointer">Delete</button>
          </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default ConfirmModal