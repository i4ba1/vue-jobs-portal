// composables/useValidation.ts
export function useValidation() {
    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    const validatePassword = (password: string): boolean => {
      return password.length >= 8
    }
  
    const validateRequired = (value: any): boolean => {
      return !!value
    }
  
    return {
      validateEmail,
      validatePassword,
      validateRequired
    }
  }