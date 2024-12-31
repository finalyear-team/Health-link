import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

const FormButton = ({ disabled, onBack, children, Next }: { disabled: boolean, children?: React.ReactNode, onBack: () => void, Next: "Next" | "Finish" }) => {
    return (
        <div className="space_buttons">
            <Button variant={"outline"} type="button" onClick={onBack} className="bg-slate-800 hover:bg-slate-700 text-white hover:text-white">
                {children || "Back"}
            </Button>
            <Button disabled={disabled} type="submit" className="border bg-white hover:bg-white text-gray-800 border-gray-600  hover:border-gray-800  ">
                {disabled ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    ""
                )}{" "}
                {Next}
            </Button>
        </div>
    )
}

export default FormButton