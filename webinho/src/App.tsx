//JSX: Javascript + XML (HTML)
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';


import'./styles/main.css';

//Imagens
import logoImg from './assets/logo-nlw.svg';
//Icons com biblioteca
import { CreateAdBanner } from './components/CreateAdBanner';
import { GamerBanner } from './components/GameBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';


interface Game{
  id: string;
  title: string;
  bannerURL: string;
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:2222/games').then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt=""/>
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GamerBanner
              key={game.id}
              title={game.title}
              bannerURL={game.bannerURL}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
