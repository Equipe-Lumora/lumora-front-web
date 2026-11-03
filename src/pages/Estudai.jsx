import { useState, useRef, useEffect } from 'react';

const FlashcardItem = ({ card }) => {
  const [mostrarResposta, setMostrarResposta] = useState(false);
  
  return (
    <div 
      onClick={() => setMostrarResposta(!mostrarResposta)} 
      className="bg-black p-4 rounded-lg border border-gray-800 cursor-pointer hover:border-primary/50 transition-all select-none"
    >
      <div className="flex justify-between items-center gap-4">
        <p className="font-bold text-sm text-white">Q: {card.pergunta}</p>
        <span className="text-[11px] text-primary bg-primary/10 border border-primary/30 rounded px-2.5 py-1 flex-shrink-0">
          {mostrarResposta ? 'Esconder ▲' : 'Ver Resposta ▼'}
        </span>
      </div>
      
      {mostrarResposta && (
        <div className="border-t border-gray-800 pt-3 mt-3">
          <p className="text-sm text-gray-400 leading-relaxed">R: {card.resposta}</p>
        </div>
      )}
    </div>
  );
};

export default function Estudai() {
  const [albuns, setAlbuns] = useState(['História', 'Geografia', 'Física', 'Química', 'Biologia', 'Inglês']);
  const [imagens, setImagens] = useState([]);
  const [albumAberto, setAlbumAberto] = useState(null);
  const [imagemAberta, setImagemAberta] = useState(null);
  
  const [novoAlbum, setNovoAlbum] = useState('');
  const [mostrarModalAlbum, setMostrarModalAlbum] = useState(false);

  const [mostrarModalMover, setMostrarModalMover] = useState(false);
  const [pastaDestino, setPastaDestino] = useState('');

  const [isCameraAberto, setIsCameraAberto] = useState(false);
  const [stream, setStream] = useState(null);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [mostrarModalGuardar, setMostrarModalGuardar] = useState(false);
  const [tituloFoto, setTituloFoto] = useState('');
  const [destinoFoto, setDestinoFoto] = useState('Rolo de câmera');

  const [mostrarGeradorCard, setMostrarGeradorCard] = useState(false);
  const [assuntoCard, setAssuntoCard] = useState('');
  const [loadingCard, setLoadingCard] = useState(false);
  const [resultadoCard, setResultadoCard] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const [mostrarResumo, setMostrarResumo] = useState(false);
  const [assuntoResumo, setAssuntoResumo] = useState('');
  const [loadingResumo, setLoadingResumo] = useState(false);
  const [textoResumo, setTextoResumo] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imagensRolo = imagens.filter(img => img.album === 'Rolo de câmera');

  const abrirCamera = async () => {
    setIsCameraAberto(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (error) {
      alert("Erro ao aceder à câmara.");
      setIsCameraAberto(false);
    }
  };

  const fecharCamera = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    setIsCameraAberto(false);
    setStream(null);
  };

  const tirarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setFotoCapturada(canvas.toDataURL('image/jpeg'));
      fecharCamera();
      setTituloFoto('');
      setDestinoFoto(albumAberto && albumAberto !== 'Rolo de câmera' ? albumAberto : 'Rolo de câmera');
      setMostrarModalGuardar(true);
    }
  };

  const guardarImagem = (e) => {
    e.preventDefault();
    if (!tituloFoto.trim()) return alert("Dê um título à imagem.");
    const novaImagem = { id: Date.now().toString(), src: fotoCapturada, titulo: tituloFoto, album: destinoFoto };
    setImagens([...imagens, novaImagem]);
    setMostrarModalGuardar(false);
    setFotoCapturada(null);
  };

  const criarNovoAlbum = (e) => {
    e.preventDefault();
    if (novoAlbum.trim() && !albuns.includes(novoAlbum)) {
      setAlbuns([...albuns, novoAlbum.trim()]);
      setNovoAlbum('');
      setMostrarModalAlbum(false);
    }
  };

  const removerAlbum = (albumParaRemover, e) => {
    e.stopPropagation();
    setAlbuns(albuns.filter(album => album !== albumParaRemover));
    setImagens(imagens.map(img => img.album === albumParaRemover ? { ...img, album: 'Rolo de câmera' } : img));
  };

  const abrirModalMover = () => {
    setPastaDestino(imagemAberta.album);
    setMostrarModalMover(true);
  };

  const moverImagem = (e) => {
    e.preventDefault();
    if (pastaDestino && pastaDestino !== imagemAberta.album) {
      setImagens(imagens.map(img => img.id === imagemAberta.id ? { ...img, album: pastaDestino } : img));
      setMostrarModalMover(false);
      setImagemAberta(null); 
    } else {
      setMostrarModalMover(false);
    }
  };

  const criarFlashcard = async () => {
    if (!assuntoCard) return;
    setLoadingCard(true);
    try {
      const res = await fetch('http://localhost:8000/api/flashcards/ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assunto: assuntoCard })
      });
      const data = await res.json();
      if (res.ok) {
        setResultadoCard({ nome: data.titulo, pergunta: data.pergunta, resposta: data.resposta, dificuldade: data.dificuldade });
      }
    } catch (err) {
      alert("Erro ao ligar ao servidor.");
    } finally {
      setLoadingCard(false);
    }
  };

  const salvarCard = () => {
    if (resultadoCard) {
      setFlashcards([...flashcards, { ...resultadoCard, id: Date.now(), imagemId: imagemAberta.id }]);
      setResultadoCard(null);
      setAssuntoCard('');
      setMostrarGeradorCard(false);
    }
  };

  const criarResumo = async () => {
    if (!assuntoResumo) return;
    setLoadingResumo(true);
    try {
      const res = await fetch('http://localhost:8000/api/resumo/ia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assunto: assuntoResumo })
      });
      const data = await res.json();
      if (res.ok) {
        setTextoResumo(data.resumo);
      }
    } catch (err) {
      alert("Erro ao ligar ao servidor.");
    } finally {
      setLoadingResumo(false);
    }
  };

  useEffect(() => {
    return () => { if (stream) stream.getTracks().forEach(track => track.stop()); };
  }, [stream]);

  if (imagemAberta) {
    const cardsDaImagem = flashcards.filter(c => c.imagemId === imagemAberta.id);
    return (
      <div className="min-h-screen bg-[#111111] text-white pt-24 pb-16 px-4 sm:px-6 md:px-10 font-work">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => { setImagemAberta(null); setMostrarGeradorCard(false); setMostrarResumo(false); }} className="text-primary hover:text-white mb-6 flex items-center gap-2 font-bold text-sm sm:text-base">
            ← Voltar para a Galeria
          </button>
          
          <div className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 border border-gray-800 shadow-xl">
            <img src={imagemAberta.src} alt={imagemAberta.titulo} className="w-full max-h-[40vh] sm:max-h-[50vh] object-contain rounded-lg mb-4 bg-black" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white break-words">{imagemAberta.titulo}</h2>
                <p className="text-xs text-gray-500 mt-1">Pasta: {imagemAberta.album}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <button onClick={abrirModalMover} className="bg-[#2a2416] border border-primary/30 text-[#e6c138] text-xs sm:text-sm px-4 py-2 rounded-full hover:bg-primary/20 transition-colors">
                Mover Álbum
              </button>
              
              <button 
                onClick={() => { setMostrarResumo(!mostrarResumo); setMostrarGeradorCard(false); }} 
                className="bg-[#2a2416] border border-primary/30 text-[#e6c138] text-xs sm:text-sm px-4 py-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                Criar Resumo
              </button>

              <button 
                onClick={() => { setMostrarGeradorCard(!mostrarGeradorCard); setMostrarResumo(false); }} 
                className="bg-primary text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-[0_0_10px_rgba(255,201,19,0.3)] hover:bg-white transition-colors"
              >
                Criar Flashcard
              </button>
            </div>

            {mostrarResumo && (
              <div className="bg-black rounded-xl p-4 sm:p-5 border border-primary/50 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#e6c138]"></div>
                <h3 className="text-primary font-bold text-sm sm:text-base mb-2">Criar Resumo</h3>
                <p className="text-xs text-gray-400 mb-4">Insira o tema para gerar um resumo detalhado.</p>
                
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Ex: Revolução Francesa..." 
                    value={assuntoResumo}
                    onChange={(e) => setAssuntoResumo(e.target.value)}
                    className="flex-1 bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  />
                  <button onClick={criarResumo} disabled={loadingResumo} className="bg-primary text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors">
                    {loadingResumo ? 'A gerar...' : 'Gerar'}
                  </button>
                </div>

                {textoResumo && (
                  <div className="bg-[#111] p-4 rounded-lg border border-gray-800 mt-4">
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{textoResumo}</p>
                  </div>
                )}
              </div>
            )}

            {mostrarGeradorCard && (
              <div className="bg-black rounded-xl p-4 sm:p-5 border border-primary/50 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <h3 className="text-primary font-bold text-sm sm:text-base mb-2">Criar Flashcard</h3>
                <p className="text-xs text-gray-400 mb-4">Insira o tema para procurar.</p>
                
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Ex: Fotossíntese..." 
                    value={assuntoCard}
                    onChange={(e) => setAssuntoCard(e.target.value)}
                    className="flex-1 bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-primary focus:outline-none"
                  />
                  <button onClick={criarFlashcard} disabled={loadingCard} className="bg-primary text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors">
                    {loadingCard ? 'A processar...' : 'Gerar'}
                  </button>
                </div>

                {resultadoCard && (
                  <div className="bg-[#111] p-4 rounded-lg border border-gray-800 mt-4">
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded mb-2 inline-block">Dif: {resultadoCard.dificuldade}</span>
                    <p className="font-bold text-sm mb-1 text-white">Q: {resultadoCard.pergunta}</p>
                    <p className="text-sm text-gray-400 mb-4">R: {resultadoCard.resposta}</p>
                    <button onClick={salvarCard} className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-500 transition-colors">Guardar Card</button>
                  </div>
                )}
              </div>
            )}

            {cardsDaImagem.length > 0 && (
              <div className="mt-6 border-t border-gray-800 pt-6">
                <h4 className="font-bold text-gray-300 mb-4 text-sm">Flashcards Guardados:</h4>
                <div className="space-y-3">
                  {cardsDaImagem.map(card => (
                    <FlashcardItem key={card.id} card={card} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {mostrarModalMover && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <form onSubmit={moverImagem} className="bg-[#1a1a1a] p-6 rounded-2xl border-2 border-primary/30 max-w-sm w-full shadow-2xl">
              <h3 className="text-primary text-center font-bold text-xl mb-4">Mover Imagem</h3>
              <select 
                value={pastaDestino} 
                onChange={(e) => setPastaDestino(e.target.value)} 
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white mb-8 focus:outline-none focus:border-primary text-sm appearance-none"
              >
                <option value="Rolo de câmera">Rolo de câmera (Não catalogado)</option>
                {albuns.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <div className="flex justify-between">
                <button type="button" onClick={() => setMostrarModalMover(false)} className="text-gray-400 font-bold px-4 py-2 hover:text-white">Cancelar</button>
                <button type="submit" className="bg-primary text-black font-bold px-8 py-2 rounded-full hover:bg-white transition-colors">Mover</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  if (albumAberto) {
    const imagensDaPasta = imagens.filter(img => img.album === albumAberto);
    return (
      <div className="min-h-screen bg-[#111111] text-white pt-24 pb-16 px-4 sm:px-6 md:px-10 font-work">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setAlbumAberto(null)} className="text-primary hover:text-white mb-6 flex items-center gap-2 font-bold text-sm sm:text-base">
            ← Voltar
          </button>
          
          <h2 className="text-2xl sm:text-3xl font-archivo text-primary mb-2 text-center">{albumAberto}</h2>
          
          {imagensDaPasta.length === 0 ? (
            <p className="text-gray-500 text-center py-20">Nenhuma imagem nesta pasta ainda.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
              {imagensDaPasta.map(img => (
                <div key={img.id} onClick={() => setImagemAberta(img)} className="bg-white rounded-lg p-2 relative group flex flex-col items-center cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <button onClick={(e) => { e.stopPropagation(); setImagens(imagens.filter(i => i.id !== img.id)); }} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">✕</button>
                  <img src={img.src} alt={img.titulo} className="w-full h-28 sm:h-32 object-cover rounded mb-2 border border-gray-200" />
                  <p className="text-black text-xs font-bold text-center w-full truncate px-1">{img.titulo}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-24 pb-24 px-4 sm:px-6 md:px-10 font-work relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-primary mb-8">EstudAI</h1>

        <p className="text-gray-400 text-sm mb-2">Não catalogado</p>
        <div onClick={() => setAlbumAberto('Rolo de câmera')} className="bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4 mb-8 border border-gray-800 hover:border-primary transition-all cursor-pointer shadow-md">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center text-black text-xl sm:text-2xl shadow-inner"><span className="opacity-90">📁</span></div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-white">Rolo de câmera</h3>
            <p className="text-xs sm:text-sm text-gray-400">{imagensRolo.length} imagens recentes</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">Álbuns</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {albuns.map(album => (
            <div key={album} onClick={() => setAlbumAberto(album)} className="bg-[#2a2416] border border-[#3d3319] rounded-xl p-4 h-28 sm:h-32 flex items-end justify-center relative group cursor-pointer hover:border-primary transition-all shadow-md">
               <button onClick={(e) => removerAlbum(album, e)} className="absolute top-2 right-2 text-red-500 bg-black/80 rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
               <span className="font-bold text-[#e6c138] text-xs sm:text-sm tracking-wide text-center">{album}</span>
            </div>
          ))}
          
          <div onClick={() => setMostrarModalAlbum(true)} className="border-2 border-dashed border-[#3d3319] rounded-xl p-4 h-28 sm:h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary text-primary transition-all bg-black/20">
            <span className="text-2xl mb-1">+</span><span className="text-[11px] sm:text-xs font-semibold text-[#e6c138] text-center">Criar novo album</span>
          </div>
        </div>
      </div>

      <button onClick={abrirCamera} className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-primary w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(255,201,19,0.4)] hover:scale-110 transition-transform z-40 border-2 border-[#111]">
        <span className="text-xl sm:text-2xl text-black">📷</span>
      </button>

      {mostrarModalAlbum && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <form onSubmit={criarNovoAlbum} className="bg-[#2b211e] p-6 rounded-2xl max-w-sm w-full shadow-2xl">
            <h3 className="text-base text-center mb-6 text-gray-300">Digite o nome da nova pasta:</h3>
            <input type="text" value={novoAlbum} onChange={(e) => setNovoAlbum(e.target.value)} className="w-full bg-transparent border-b border-primary/50 px-2 py-2 text-white mb-8 focus:outline-none focus:border-primary text-center text-lg" autoFocus />
            <div className="flex justify-between border-t border-gray-700 pt-4">
              <button type="button" onClick={() => setMostrarModalAlbum(false)} className="w-1/2 text-gray-400 font-bold hover:text-white">Cancelar</button>
              <button type="submit" className="w-1/2 text-primary font-bold hover:text-[#ffdf6b]">OK</button>
            </div>
          </form>
        </div>
      )}

      {isCameraAberto && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
          </div>
          <div className="bg-[#1a1a1a] p-6 flex justify-between items-center pb-10 rounded-t-[30px] border-t-2 border-primary">
            <button onClick={fecharCamera} className="text-gray-400 font-bold text-sm px-4 py-2">Cancelar</button>
            <button onClick={tirarFoto} className="text-primary font-bold text-lg px-6 py-2 border-2 border-primary rounded-full hover:bg-primary hover:text-black transition-colors">Tirar Foto</button>
            <div className="w-20"></div>
          </div>
        </div>
      )}

      {mostrarModalGuardar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <form onSubmit={guardarImagem} className="bg-[#1a1a1a] p-6 rounded-2xl border-2 border-primary/30 max-w-sm w-full shadow-2xl">
            <h3 className="text-primary text-center font-bold text-xl mb-2">Guardar Imagem</h3>
            <p className="text-gray-400 text-sm text-center mb-6">Em qual pasta deseja armazenar?</p>
            <input type="text" placeholder="Título (ex: Pronomes - Aula 1/08)" value={tituloFoto} onChange={(e) => setTituloFoto(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-primary text-sm" autoFocus />
            <select value={destinoFoto} onChange={(e) => setDestinoFoto(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white mb-8 focus:outline-none focus:border-primary text-sm appearance-none">
              <option value="Rolo de câmera">Não Catalogado (Rolo de câmera)</option>
              {albuns.map(album => <option key={album} value={album}>{album}</option>)}
            </select>
            <div className="flex justify-center"><button type="submit" className="bg-primary/10 border border-primary text-primary font-bold px-12 py-2.5 rounded-full hover:bg-primary hover:text-black transition-colors">Salvar</button></div>
          </form>
        </div>
      )}

    </div>
  );
}