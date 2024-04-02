const format_name_folder = (name) => {
    let formatted_name = name.replace(/[^\w\s]/g, "").replace(/\s+/g, "_");
    return formatted_name.toLowerCase();
}

module.exports = { format_name_folder }