export default function Header() {
  return (
    <div className="flex flex-col gap-4 items-start h-full w-fit">
      <h2 className="text-2xl font-bold md:text-3xl">Welcome</h2>
      <p className="max-w-full md:text-lg">Say hello to <span className="font-bold">Inspector Alert</span>. 
      This is a passion project stemmed from my various negative experiences with myki inspectors. 
      This website is still in it's very early stages, so bare that in mind as you explore my project. 
      <br/><br/>My goal with this website is to provide an easy and clean way to report and view myki inspector activities across Victoria. 
      Currently I am just trialing train lines, but may expand to bus lines if popularity picks up.
      <br/><br/>
      If you encounter any pain points, bugs or just want to give suggestions, feel free to do so <a className="underline" href="https://forms.gle/TfLyoV5M3VRANZJU8"target="_blank" rel="noopener noreferrer">here</a>.
      </p>
    </div>
  );
}
