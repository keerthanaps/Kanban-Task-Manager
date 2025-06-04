const Footer = () => {
  return (
    <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
      <p>
        <a
          href="https://github.com/keerthanaps/Kanban-Task-Manager"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500"
        >
          GitHub Repo
        </a>{" "}
        · Made by Keerthana · © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
