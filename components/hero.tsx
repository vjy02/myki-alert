export default function Header() {
  return (
    <div className="flex flex-col gap-4 items-start h-full w-fit md:text-lg">
      <h2 className="text-2xl font-bold md:text-3xl">Welcome</h2>
      <p className="max-w-full">Say hello to <span className="font-bold">PTV Alert</span>. 
      <br/><br/>
      This is a basic reporting system by train line and direction. I wanted to focus on simplicity for now and see if there is a demand for this. 
      Currently styled for mobile, but works fine on bigger screens.
      <br/><br/>
      If you encounter any pain points, bugs or just want to give suggestions, feel free to do so <a className="underline" href="https://forms.gle/TfLyoV5M3VRANZJU8"target="_blank" rel="noopener noreferrer">here</a>.
      </p>
      <br/>
      <h3 className="font-bold text-xl md:text-2xl">Add this website like an app:</h3>
      <ul className="flex flex-col gap-4">
        <li><span className="font-bold">Safari:</span> Tap the Share button in the menu bar. Scroll down the list of options, then tap Add to Home Screen.</li>
        <li><span className="font-bold">Chrome:</span> Tap the three vertical dots button at the top right corner of the screen. Select Add to Home Screen.
        </li>
      </ul>
    </div>
  );
}
