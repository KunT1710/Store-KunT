import "./last.footer.scss";

const handleClick = () => {
    return window.open("https://github.com/Kun1710", "_blank");
}
function LastFooter() {
  return (
    <div className="last-footer">
      <span className="copyright" onClick={handleClick}>Copyright © 2025 KunT</span>
    </div>
  );
}
export default LastFooter;