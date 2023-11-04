import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {
  static targets = ["form", "items"]
  static values = { position: String }
  connect() {
  }

  send(event){
    event.preventDefault()
    console.log("Send request via AJAX")
    const url = this.formTarget.action
    const options = {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    }
    fetch(url, options).then(response => response.json()).then((data) => {
      console.log(data)
      if (data.inserted_item){
        this.itemsTarget.insertAdjacentHTML(this.positionValue, data.inserted_item)
      }
      this.formTarget.outerHTML = data.form
    })
  }
}
