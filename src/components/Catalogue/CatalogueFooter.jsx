const CatalogueFooter = () => {
    const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © {year} - All right reserved by RetailerStore</p>
      </aside>
    </footer>
  );
};

export default CatalogueFooter;
