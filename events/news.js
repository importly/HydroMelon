const puppeteer = require("puppeteer");
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

let get_update_file = () => {
  const updatesf = fs.readFileSync("data/updates.json", "utf8");
  return JSON.parse(updatesf);
};

let set_update_file = (New_info) => {
  let info = JSON.stringify(New_info);
  fs.writeFile("data/updates.json", info, "utf8", () => {
    console.log("Worked");
  });
};

async function stanton_website(client) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://dcps.duvalschools.org/site/default.aspx?PageType=14&DomainID=137&PageID=268&ModuleInstanceID=61443&ViewID=c83d46ac-74fe-4857-8c9a-5922a80225e2&IsMoreExpandedView=True");
  let updated_sites_names = get_update_file();
  // set up two tables and then match them up

  let titlelist = [];
  let linklist = [];

  let titles = await page.$$eval(".ui-articles a", (elements) =>
    elements.map((item) => item.textContent)
  );
  let links = await page.$$eval(".sub-link", (elements) =>
    elements.map((item) => item.getAttribute("href"))
  );
  let images = await page.$$eval(".ui-articles img", (elements) =>
    elements.map((item) => item.getAttribute("src"))
  );

  for (let i = 0; i < images.length; i++) {
    images[i] = images[i].replaceAll("../", "");
    images[i] = images[i].replaceAll(" ", "%20");
  }

  for (let i = 0; i < titles.length; i++) {
    if (titles[i] != "Comments (-1)") {
      titlelist.push(titles[i]);
    }
  }

  for (let i = 0; i < links.length; i++) {
    links[i] = links[i].replaceAll(" ", "%20");
    if (links[i].substring(0, 5) == "https") {
      linklist.push(links[i]);
    } else if (links[i].substring(0, 3) == "../") {
      links[i] = links[i].replaceAll("../", "");
      linklist.push("https://dcps.duvalschools.org/" + links[i]);
    }
  }

  console.log(titlelist);
  console.log(linklist);
  console.log(images);

  for (let i = 0; i < titlelist.length; i++) {
    if (updated_sites_names[titlelist[i]]) {
      if (updated_sites_names[titlelist[i]].broadcasted == true) {
        console.log("Already updated");
        continue;
      }
    }
    updated_sites_names[titlelist[i]] = {
      link: linklist[i],
      broadcasted: false,
      img: images[i],
    };
  }

  for (const [key, value] of Object.entries(updated_sites_names)) {
    if (updated_sites_names[key].broadcasted == false) {
      let channel = client.channels.cache.find(
        (ch) => ch.name === "stanton-school-announcements"
      );
      let channel_2 = client.channels.cache.find(
        (ch) => ch.name === "stanton-school-announcements-feed"
      );
      const embed = new MessageEmbed()
        .setTitle(key)
        .setURL(value.link)
        .setColor(0xff0000)
        .setImage("https://dcps.duvalschools.org/" + value.img);
      channel.send(embed);
      channel_2.send(embed);

      updated_sites_names[key].broadcasted = true;
    }
  }
  set_update_file(updated_sites_names);
  console.log(updated_sites_names);

  browser.close();
}

module.exports = (client) => {
  setInterval(stanton_website, 3600000, client);
};
