downloadEggDex();

async function downloadEggDex() {
    let eggs = Object.create(null);
    let listElement = $(".wikitable tbody").find("tr");

    for (let i = 0; i < listElement.length; i++) {
        let tr = $(listElement).eq(i).find("td");

        let imageUrl = tr.eq(0).find("img").attr("src").replace(/\/revision.*/g, "");
        let name = tr.eq(1).text().trim();
        let description = tr.eq(2).text().trim();
        let rarity = tr.eq(3).text().trim();

        eggs[name] = {
            description: description,
            rarity: rarity
        }

        chrome.runtime.sendMessage(
            {
                url: imageUrl,
                name: name
            }
        );

        await sleep(1000);
    }

    saveJSON(eggs, "egg");
}

function saveJSON(data, name) {
    let bl = new Blob([JSON.stringify(data)], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = `${name}.json`;
    a.hidden = true;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
