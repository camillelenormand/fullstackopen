// Button.jsx

const Button = ({ onClick, children, ...props }) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button