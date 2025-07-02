import { Button } from "@/components/ui/button"


export default function MainButton() {
    return (
        <div className="flex flex-col gap-3 m-10">
            <div>
            <Button
                variant="mainButton"
                size="lg"
            >
                Button
            </Button>
            </div>

            <div>
            <Button
                variant="subButton"
                size="lg"
            >
                Button
            </Button>
            </div>

            <div>
            <Button
                variant="acceptButton"
                size="lg"
            >
                Button
            </Button>
            </div>

            <div>
            <Button
                variant="rejectButton"
                size="lg"
            >
                Button
            </Button>
            </div>


            <div>
            <Button
                variant="confirmButton"
                size="lg"
            >
                Button
            </Button>
            </div>

            <div>
            <Button
                variant="prevButton"
                size="lg"
            >
                Button
            </Button>
            </div>




          
        </div>
    )
}