import { useToast } from "../context/ToastContext"

const Toast = () => {
    const {toasts} = useToast();
  return (
    <div className="fixed flex justify-center items-center bottom-16 right-0 left-0 z-50 pointer-events-none">

    <div className="flex flex-col gap-2 pointer-events-auto">
        {
            toasts.map(t => (
                <div key={t.id} className={`px-4 py-2 rounded-lg text-sm text-white ${t.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {t.message}
                </div>
            ))
        }
    </div>
            </div>
  )
}

export default Toast
