import github from "/github.svg";

export default function Footer() {
  return (
    <footer>
      <a href="https://github.com/Andrij-Kolomijec">
        <img src={github} alt="GitHub Icon" title="More of my work" />
      </a>
      <span>
        Background image from&nbsp;
        <a
          title="Visit website"
          className="clickable"
          href="https://www.freepik.com/free-photo/solid-concrete-wall-textured-backdrop_17839221.htm#fromView=popular&page=1&position=8&uuid=ed43c725-192a-4d78-9520-9449bce842a3"
        >
          Freepik
        </a>
      </span>
    </footer>
  );
}
