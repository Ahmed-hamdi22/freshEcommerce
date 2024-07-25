import { Player } from '@lottiefiles/react-lottie-player';
import '@dotlottie/player-component'
export default function Loading() {
  return <>
  <div className='flex justify-center items-center'>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module">

    </script>
     <dotlottie-player src="https://lottie.host/8b36eae2-4442-454d-b6ff-0e47e5505683/eZvDQp34rZ.json" background="transparent" speed="1" style={{width: 300+'px', height: 300+'px'}} loop autoplay>

     </dotlottie-player>
     </div>
  </>
  
}
