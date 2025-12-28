'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../ui/input'
import TooltipWrapper from './tooltip-wrapper'

type PasswordInputProps = {
  id: string
  placeholder?: string
  disabled?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  name: string
}

const PasswordInput = ({ id, placeholder, disabled, value, onChange, onBlur, name }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
        tabIndex={0}
        disabled={disabled}
      >
        {showPassword ? (
          <TooltipWrapper tooltip="Sembunyikan password">
            <Eye className="h-4 w-4 text-gray-500" />
          </TooltipWrapper>
        ) : (
          <TooltipWrapper tooltip="Tampilkan password">
            <EyeOff className="h-4 w-4 text-gray-500" />
          </TooltipWrapper>
        )}
      </button>
    </div>
  )
}

export default PasswordInput