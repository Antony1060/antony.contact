const Namer = require("@parcel/plugin").Namer
const path = require("path");

module.exports = new Namer({
    name({ bundle }) {
        // only rename in production, I didn't want to add this but parcel will throw some ambiguous error
        // found a similar issue on github https://github.com/parcel-bundler/parcel/issues/6528, currently still unresolved
        if(process.env.NODE_ENV !== "production") return null;

        const filePath = bundle.getMainEntry().filePath;
        const parentDir = path.dirname(filePath).substring(process.cwd().length + 1);
        if(parentDir === "assets")
            return `assets/${path.basename(filePath)}`
        return null;
    }
})