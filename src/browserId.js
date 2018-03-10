
import uuidv4 from 'uuid/v4'

export default function browserId() {
  let key = "browserId"
  let bid = localStorage.getItem(key)
  if (bid) return bid
  bid = uuidv4()
  localStorage.setItem(key, bid)
  return bid
}

