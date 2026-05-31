
const Container = ({children, classname=''}) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6 ${classname}`}>
        {children}
    </div>
  )
}

export default Container