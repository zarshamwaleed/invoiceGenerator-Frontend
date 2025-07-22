const handleDownloadClick = async (e) => {
  e.preventDefault();

  if (isDownloading) return; // Prevent multiple clicks

  setIsDownloading(true);

  try {
    // ✅ Save invoice first
    const savedInvoice = await handleSubmit();

    // ✅ Update invoice number if backend returned it
    if (savedInvoice.invoice?.invoiceNumber) {
      setInvoiceNumber(savedInvoice.invoice.invoiceNumber);
    }

    // ✅ Generate PDF & navigate
    requestAnimationFrame(() => {
      toPDF();
      setTimeout(() => {
        setIsDownloading(false); // ✅ Reset after short delay
        navigate("/thankyou");
      }, 1000); // adjust timing if necessary
    });
  } catch (error) {
    console.error("Error in download process:", error);

    Swal.fire({
      title: "❌ Failed to Generate Invoice",
      text: "Something went wrong during the download process. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });

    setIsDownloading(false); // Ensure we re-enable the button
  }
};
