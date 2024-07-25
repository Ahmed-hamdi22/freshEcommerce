import errorNotFound from "../../assets/error404.svg"
export default function NotFound() {
  return (
    <div>
            <div className="flex items-center justify-center mt-2">
              <img src={errorNotFound} alt="" />
          </div>

    </div>
  )
}
