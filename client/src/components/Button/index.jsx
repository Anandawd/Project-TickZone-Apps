import React from 'react'
import Button from 'react-bootstrap/Button'

export default function CustomButton({
    children, 
    action,
    variant,
    size,
    loading, 
    disable,
    className
}) {
  return (
    <Button 
    className={className}
    onClick={action}
    variant={variant}
    disabled={disable}
    size={size}
    >
        {loading ? 'Loading...' : children}
    </Button>
  )
}
