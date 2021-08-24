const { MessageEmbed, Message } = require("discord.js");
const Client = require("../../client/Client");
const BaseCommand = require("../../client/BaseCommand");
const fs = require("fs");

class help extends BaseCommand {
  constructor() {
    super("info", "Gets info about you", "info", ["sus","who", "info"]);
  }
    /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  static execute(client, message, args) {
    let sender = new MessageEmbed();
    sender.setTitle("").setTimestamp();

    message.channel.send(sender);
  }
}
module.exports = help;

// from selenium import webdriver
// from webdriver_manager.chrome import ChromeDriverManager
// from selenium.common.exceptions import NoSuchElementException
// from selenium.webdriver.chrome.options import Options
// import time

// chrome_options = Options()
// chrome_options.headless = False
// def main(driver=webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)):

//     name = input("What is the name?: ")
//     driver.get("https://fs.duvalschools.org/adfs/ls/?client-request-id=a320fbac-85b9-c481-09c9-c55a29bb8a6b&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQIIAY2RP4zSYADF-1GuAmokxsFNoi6afO339T9NTKzgHcghcsJ5spBaWmgo_Ur_wMHmcMY43ex4xoU4GQc9FwcdvIlJkxtdzjipk8ZFiIubvuHlDW95v3eZxizWLqI_4uHSIbJtDE1rmf5ScDqTffYr9-TVzv236ffvWpdeP-rPwLleFPmhxnEkjlxC-iyxbce0WJMMODI2uJcAzAGYJRRZUGReUZCAVQmrWEIyaxi20uFtCxpSx4KiaPDQsEwZ2sqih3lZzkviYeJUTY-jHr80EjhT63sibZNg0PZJGD2m28W74fb1UO8WqoXxqCGXKo7TncK1YdATlHaj3G9KZV3UJ7XyjWZ9sNpq3HTizdjVvcrWULknxeqqElR7BpKInC-ZmxHarvjFOyQQJnHbg3VzRv8XnOc0s1g8IN4BzRDf8pzOJ_pCiLEqi3leuBpGccfyopDtxCPDDc0eIW7IkqA7T4IvyROI1lKpTJY6S-WoH0mwt7JAPX76caf97aj0YO_ni_qHI-pghZushxvdjchyxPj2aKiOBXd9bJW9YqmKhdrWNX-65rkVKRhxQvOKrOFdBuwyzD6TTtFZ6jxduIU_M-ArAx4eo_bT__rtMHOGRzyGSIG8lENIE1RNRK35cfDmJPUb0&cbcxt=&username=s11864923%40students.duvalschools.org&mkt=&lc=")
//     driver.find_element_by_css_selector("#bySelection > div:nth-child(3) > div > span").click()
//     password_box = driver.find_element_by_id("passwordInput")
//     password_box.send_keys("S06r4923")
//     password_box.submit()

//     driver.find_element_by_xpath('//*[@id="app"]/div/div[2]/div[1]/div/div[3]').click()
//     user_name_searcher = driver.find_element_by_xpath('//*[@id="SearchBox3"]')
//     user_name_searcher.send_keys(name)

//     driver.find_element_by_xpath('//*[@id="owaSearchBox"]/div/button/span').click()
//     time.sleep(1)
//     try:
//         suggestions_list = driver.find_element_by_xpath('/html/body/div[2]/div/div[2]/div[2]/div[1]/div/div[2]/div/div/div/div[2]/div[1]/div/div/div/div')
//     except NoSuchElementException:
//         print("the person does not exist")
//         driver.close()
//         return 0
//     all_suggestions = suggestions_list.find_elements_by_xpath('./*')
//     print((len(all_suggestions)))
//     driver.find_element_by_xpath('//*[@id="app"]/div/div[2]/div[2]/div[1]/div/div[2]/div/div/div/div[2]/div[1]/div/div/div/div/div[1]').click()

//     for i in range(0, (len(all_suggestions))):
//         time.sleep(2)
//         title = driver.find_element_by_xpath('/html/body/div[2]/div/div[2]/div[2]/div[1]/div/div[2]/div/div[2]/div/div/div/div/div[1]/header/div/div[2]/div[2]').text
//         name = driver.find_element_by_xpath('//*[@id="app"]/div/div[2]/div[2]/div[1]/div/div[2]/div/div[2]/div/div/div/div/div[1]/header/div/div[2]/div[1]').text
//         if title == "Stanton College Prep. - 1531":
//             print("They are a student at stanton")
//             print(name)
//             break
//         else:
//             print("They are not a student at Stanton")
//             print(title)
//             print(name)
//             driver.find_element_by_xpath('/html/body/div[2]/div/div[2]/div[2]/div[1]/div/div[1]/div/div/div/div/div/div[2]/div[3]/button/span').click()
//     driver.close()

// if __name__ == '__main__':
//     main()