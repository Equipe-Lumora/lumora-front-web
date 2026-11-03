import { Link } from 'react-router-dom';

import celularImg from '../assets/imgs/celular.png';
import celular1Img from '../assets/imgs/celular1.png';
import celular2Img from '../assets/imgs/celular2.png';
import lampadaSvg from '../assets/imgs/lampada.svg';
import userSvg from '../assets/imgs/user.svg';
import instaSvg from '../assets/imgs/insta.svg';
import setaBaixoSvg from '../assets/imgs/seta-baixo.svg';
import lauraImg from '../assets/imgs/Laura (1).png';
import raphaelImg from '../assets/imgs/Raphael.png';
import viniciusImg from '../assets/imgs/Vinicius.jpeg';

const publicoCards = [
  { id: '01', desc: 'Câmeras que transcrevessem para um bloco de notas o conteúdo fotografado, como imagens, textos e planilhas.' },
  { id: '02', desc: 'Smartphone com tela grande e app que reuna vídeos e PDFs, com recursos de resumo e explicação focada.' },
  { id: '03', desc: 'Digitalização e leitura automática de textos a partir de fotos tiradas com a câmera.' },
  { id: '04', desc: 'Armazenamento em pastas e criação de conteúdo de aprendizado a partir das fotos tiradas.' }
];

const solucoes = [
  { titulo: 'Galeria com separação automática por tema', desc: 'App à parte que organiza fotos por contexto, armazenando imagens referentes aos estudos.', destaque: false },
  { titulo: 'Modo Estudo Inteligente', desc: 'Reconhece fotos de lousas e cadernos, transcreve textos, cria flashcards e resumos.', destaque: true },
  { titulo: 'Escaneamento Inteligente', desc: 'O sistema detecta o contexto em tempo real e sugere o modo de câmera ideal na tela.', destaque: false }
];

const equipe = [
  { nome: 'Laura Siqueira', papel: 'Organização', img: lauraImg },
  { nome: 'Raphael Mascarenhas', papel: 'Comunicação', img: raphaelImg },
  { nome: 'Vitória Ferreira', papel: 'Estrutura', img: viniciusImg },
];

export default function Home() {
  return (
    <div className="font-work text-texto bg-black w-full overflow-hidden">
      
      <main>
        <section id="topo" className="relative min-h-screen flex flex-col items-center justify-center text-center px-10 py-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-[rgba(240,165,0,0.35)] blur-[40px] rounded-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative inline-block max-w-full">
              <h1 
                className="font-archivo text-[clamp(48px,14vw,190px)] text-white uppercase tracking-[-2px] leading-none relative z-10 break-words"
                style={{
                  textShadow: '20px 10px 0px rgba(255, 255, 255, 0.15)'
                }}
              >
                LUMORA
              </h1>
              <img 
                src={lampadaSvg} 
                alt="Lampada Lumora" 
                className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(60px,22vw,255px)] z-20 pointer-events-none" 
              />
            </div>
            <p className="text-white text-[clamp(11px,2vw,15px)] tracking-[3px] uppercase font-bold mt-6 px-5">A inovação é agora</p>
            
            <Link 
              to="/app" 
              className="mt-8 bg-primary text-black font-archivo font-bold px-8 py-3.5 rounded-full text-base uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,201,19,0.4)] hover:scale-105"
            >
              Acessar o App Estudai
            </Link>
          </div>
        </section>

        <div className="px-10 py-2 flex justify-start">
          <h2 className="font-archivo text-white uppercase text-[clamp(32px,8vw,80px)] leading-[1.1] max-w-full break-words" style={{ WebkitTextStroke: '1.5px white' }}>
            Nós<br /><span className="block text-right">Perguntamos:</span>
          </h2>
        </div>

        <section id="Publico" className="px-10 py-[100px] md:py-[60px]">
          <div className="max-w-[900px] mx-auto mb-12">
            <h2 className="font-archivo text-cinza uppercase text-[clamp(28px,5vw,56px)] leading-[1.15] break-words">O que os estudantes<br />desejam?</h2>
            <p className="text-[15px] leading-[1.6] max-w-[700px] mt-4">
              Nosso público-alvo são estudantes do ensino médio e superior que usam a câmera do celular como ferramenta de estudo, para fotografar lousas, anotações e materiais de aula. Para eles, a solução é relevante porque transforma fotos soltas em conteúdo organizado, evitando que registros importantes se percam entre fotos comuns na galeria.
            </p>
            <p className="mt-5 text-primary font-semibold text-[clamp(14px,2vw,18px)]">
              Perguntamos: <span className="text-light font-normal">"Se você sonhasse com um smartphone perfeito, como ele seria?"</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
            {publicoCards.map((card, index) => (
              <div key={index} className="bg-card rounded-[20px] p-8 min-h-[180px] transition-all duration-300 hover:-translate-y-1.5 border border-transparent hover:border-primary hover:bg-[#1c1a10]">
                <div className="flex items-center gap-2.5 mb-3.5">
                  <img src={userSvg} alt="Icone" className="w-11 h-11 text-primary" />
                  <span className="font-bold text-white text-xl">{card.id}</span>
                </div>
                <p className="text-[16px] leading-[1.6]">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="px-10 py-2 flex justify-end">
          <h2 className="font-archivo text-white uppercase text-[clamp(32px,8vw,80px)] leading-[1.1] text-right max-w-full break-words" style={{ WebkitTextStroke: '1.5px white' }}>
            E nós<br /><span className="block">ouvimos...</span>
          </h2>
        </div>

        <section id="Solucao" className="bg-black py-[120px] px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-[1200px] mx-auto">
          <div className="relative justify-self-center md:justify-self-start">
            <div className="absolute top-[40%] left-[-5%] w-[90%] h-[55%] bg-[#2a2416] rounded-[45px] z-0"></div>
            <h2 className="relative font-poppins font-extrabold text-[clamp(48px,9vw,150px)] leading-[1.05] bg-gradient-to-tr from-primary to-white bg-clip-text text-transparent z-10 break-words">
              Solução<br />do<br />Time
            </h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {solucoes.map((solucao, index) => (
              <div key={index} className={`rounded-[35px] p-8 border transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:bg-[#1c1a10] ${solucao.destaque ? 'border-primary bg-menu backdrop-blur-md' : 'bg-[#16150f] border-transparent'}`}>
                <h3 className="font-poppins font-semibold text-white text-base mb-2">{solucao.titulo}</h3>
                <p className="text-cinza-claro text-[15px] leading-relaxed">{solucao.desc}</p>
                <span className="block text-right mt-3 text-[14px] text-cinza">Alto impacto · Esforço médio</span>
              </div>
            ))}

            <div className="mt-4 text-center md:text-left">
              <Link 
                to="/app" 
                className="inline-block bg-transparent border-2 border-primary text-primary font-bold px-6 py-2.5 rounded-full text-sm uppercase hover:bg-primary hover:text-black transition-all duration-300"
              >
                Testar protótipo no Estudai →
              </Link>
            </div>
          </div>
        </section>

        <div className="px-10 py-2 mt-10 flex justify-end">
          <h2 className="font-archivo text-white uppercase text-[clamp(28px,8vw,80px)] leading-[1.1] text-right max-w-full break-words" style={{ WebkitTextStroke: '1.5px white' }}>
            FUGIMOS DO<br /><span className="block">PADRÃO</span>
          </h2>
        </div>

        <section id="Ideias" className="py-[120px] px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 max-w-[1200px] mx-auto overflow-hidden">
          <div className="flex justify-center md:order-last">
            <img 
              src={celularImg} 
              alt="Smartphone" 
              className="w-full max-w-[320px] object-contain drop-shadow-[0_20px_60px_rgba(240,165,0,0.25)] -rotate-12 transition-all duration-500 hover:rotate-3 hover:scale-105 hover:drop-shadow-[0_30px_80px_rgba(240,165,0,0.45)]" 
            />
          </div>
          <div>
            <h2 className="font-poppins font-extrabold text-[clamp(32px,6vw,110px)] leading-[0.95] bg-gradient-to-tr from-primary to-white bg-clip-text text-transparent mb-8 break-words">
              Nosso Diferencial
            </h2>
            
            <div className="bg-card backdrop-blur-xl rounded-[24px] p-6 mb-5">
              <h3 className="font-bold text-primary text-xl mb-2.5">Estudantes</h3>
              <p className="text-light text-[14px] leading-[1.6]">Organização e agilidade para armazenar conteúdos de aula. Abraçamos o estudante full-time.</p>
            </div>
            
            <div className="bg-card backdrop-blur-xl rounded-[24px] p-6">
              <h3 className="font-bold text-primary text-xl mb-2.5">Coletividade</h3>
              <p className="text-light text-[14px] leading-[1.6]">Para quem tem dificuldade de explorar modos de câmera. Nossa vantagem alcança todos.</p>
            </div>
            
            <p className="italic text-[12px] text-cinza mt-5">Uma câmera inteligente. Para cada momento. Para cada pessoa.</p>
          </div>
        </section>

        <section id="Galeria" className="py-[100px] px-10 text-center">
          <h2 className="font-archivo text-primary uppercase text-[clamp(28px,6vw,56px)] mb-14" style={{ WebkitTextStroke: '1.5px var(--color-primary)' }}>Como funcionaria:</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-[1100px] mx-auto">
            <div className="flex flex-col items-center max-w-[320px] flex-1">
              <img src={celular1Img} alt="Tela 1" className="w-full max-h-[420px] object-contain rounded-[20px] mb-5" />
              <p className="text-[14px] leading-[1.6]">Ao apontar para uma lousa, o sistema reconhece o conteúdo e sugere o envio para o Estudai.</p>
            </div>
            
            <div className="flex-shrink-0 transition-transform duration-300 rotate-0 md:-rotate-90">
              <img src={setaBaixoSvg} alt="Seta" className="w-[50px]" />
            </div>
            
            <div className="flex flex-col items-center max-w-[320px] flex-1">
              <img src={celular2Img} alt="Tela 2" className="w-full max-h-[420px] object-contain rounded-[20px] mb-5" />
              <p className="text-[14px] leading-[1.6]">Ao clicar, um aviso confirma que as fotos tiradas irão para a galeria do Estudai.</p>
            </div>
          </div>
        </section>

        <section id="Equipe" className="py-[100px] px-10 max-w-[1200px] mx-auto text-center">
          <div className="mb-14">
            <span className="text-light text-[clamp(20px,4vw,40px)] font-semibold block mb-2.5">Conheça-nos</span>
            <h2 className="font-archivo text-[clamp(28px,6vw,70px)] text-white tracking-[-1px] break-words">
              O TIME DA <span className="bg-gradient-to-tr from-primary to-white bg-clip-text text-transparent">LUMORA</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {equipe.map((membro, index) => (
              <div key={index} className="bg-light rounded-[30px] flex items-center justify-between p-2.5 pl-8 relative shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,201,19,0.2)] overflow-hidden">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-[60%] bg-primary rounded-r-[10px]"></div>
                <div className="text-left pr-2">
                  <h3 className="font-poppins text-[#a68400] text-[18px] font-extrabold leading-[1.1] mb-1">{membro.nome}</h3>
                  <p className="text-[#737373] text-[13px] font-medium">{membro.papel}</p>
                </div>
                <div className="w-[80px] h-[80px] lg:w-[110px] lg:h-[110px] rounded-full overflow-hidden border-4 border-white shrink-0 bg-gray-200 flex items-center justify-center">
                  <img src={membro.img} alt={membro.nome} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="Contato" className="py-[100px] px-10 text-center">
          <h2 className="font-archivo text-white uppercase text-[clamp(26px,6vw,56px)]" style={{ WebkitTextStroke: '1.5px white' }}>Fale com a gente</h2>
          <p className="text-[15px] mt-3 mb-8">Tem alguma dúvida ou sugestão? Entre em contato.</p>
          
          <a href="mailto:centrallumora@gmail.com" className="text-primary text-[clamp(15px,3vw,18px)] font-semibold inline-block mb-10 transition-colors hover:text-light break-words">
            centrallumora@gmail.com
          </a>

          <div className="flex justify-center flex-wrap gap-5">
            <a href="#topo" className="w-11 h-11 flex items-center justify-center bg-card rounded-full transition-all duration-300 hover:bg-primary hover:-translate-y-1">
              <img src={instaSvg} alt="Instagram" className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-header px-10 pt-12 pb-6">
        <div className="flex justify-between items-center flex-col md:flex-row flex-wrap gap-5 max-w-[1200px] mx-auto mb-8 text-center md:text-left">
          <p className="font-archivo text-primary text-[20px] tracking-[1px]">LUMORA</p>
          <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
            {['Publico', 'Ideias', 'Solucao', 'Galeria', 'Equipe', 'Contato'].map(item => (
              <a key={item} href={`#${item}`} className="text-light text-[14px] hover:text-primary transition-colors">{item}</a>
            ))}
            
            <Link 
              to="/app" 
              className="bg-primary text-black font-bold text-xs uppercase px-4 py-1.5 rounded-full hover:bg-white transition-colors ml-2"
            >
              Abrir App
            </Link>
          </nav>
        </div>
        <p className="text-center text-cinza text-[13px] border-t border-[rgba(255,255,255,0.08)] pt-5 max-w-[1200px] mx-auto">
          &copy; 2026 Lumora - Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}