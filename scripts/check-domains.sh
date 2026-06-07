#!/usr/bin/env bash
#
# check-domains.sh — generate domain candidates for this project and probe
# their availability, then print survivors (available-first).
#
# Per-TLD method (they don't share a mechanism):
#   .io  -> whois (port 43; the registry runs a normal whois server)
#   .dev -> RDAP over curl. Google Registry runs .dev and deprecated port-43
#           whois entirely; the ONLY machine-readable check is RDAP. The
#           IANA-canonical endpoint is https://pubapi.registry.google/rdap/
#           -> /domain/<name>  (404 = free, 200 = taken).
#
# NOTE: these checks are INDICATIVE ONLY. Always confirm any survivor in a real
# registrar before celebrating — and check the RENEWAL price, not just the
# first-year price. Many short/dictionary names are "premium" domains: a
# cheap (or normal) first year hides a ~$90/yr renewal forever after.
#
# Dependencies: whois + curl + coreutils.

set -u

# --- preflight ---------------------------------------------------------------
missing=()
command -v whois >/dev/null 2>&1 || missing+=(whois)
command -v curl >/dev/null 2>&1 || missing+=(curl)
if [ "${#missing[@]}" -gt 0 ]; then
	echo "Missing required tool(s): ${missing[*]}. Install:"
	echo "  macOS (Homebrew): brew install ${missing[*]}"
	echo "  Debian/Ubuntu:    sudo apt-get install -y ${missing[*]}"
	echo "  Fedora/RHEL:      sudo dnf install -y ${missing[*]}"
	echo "  Arch:             sudo pacman -S ${missing[*]}"
	exit 1
fi

# --- candidates --------------------------------------------------------------
# Short names that should evoke teardown / reverse-engineering / "how it's
# built" / stack-analysis with no explanation needed.
BASES=(
	# teardown metaphors
	teardown teardowns disasm decompile decomp
	unbuild unstack stripdown breakdown
	# under-the-hood / anatomy
	underhood anatomy innards guts xray
	dissect autopsy forensics cutaway exploded
	# stack-analysis
	stacklens stackpeek stackspec stackmap thestack
	# reverse / decompile angles
	revai unwrap peelback probe howbuilt buildspec schematic
)

TLDS=(dev io)
SLEEP=1 # seconds between queries, to dodge rate limits

# --- probes ------------------------------------------------------------------
# Each probe echoes AVAILABLE / TAKEN / UNKNOWN for one domain.

probe_io() { # whois on port 43
	local domain="$1" out
	out="$(whois "$domain" 2>/dev/null)"
	if printf '%s' "$out" | grep -qiE 'no match|not found|no data found|no entries found|status:[[:space:]]*free|available for (purchase|registration)'; then
		echo AVAILABLE
	elif printf '%s' "$out" | grep -qiE 'creation date|registry expiry date|registrar:|expiry date|domain status:[[:space:]]*ok'; then
		echo TAKEN
	else
		echo UNKNOWN
	fi
}

probe_dev() { # RDAP: 404 = free, 200 = registered
	local domain="$1" code
	code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 \
		"https://pubapi.registry.google/rdap/domain/${domain}" 2>/dev/null)"
	case "$code" in
	404) echo AVAILABLE ;;
	200) echo TAKEN ;;
	*) echo UNKNOWN ;;
	esac
}

avail=()
taken=()
unknown=()

total=$((${#BASES[@]} * ${#TLDS[@]}))
i=0
for base in "${BASES[@]}"; do
	for tld in "${TLDS[@]}"; do
		domain="${base}.${tld}"
		i=$((i + 1))
		printf '\r[%2d/%2d] querying %-24s' "$i" "$total" "$domain" >&2
		case "$tld" in
		dev) status="$(probe_dev "$domain")" ;;
		io) status="$(probe_io "$domain")" ;;
		*) status=UNKNOWN ;;
		esac
		case "$status" in
		AVAILABLE) avail+=("$domain") ;;
		TAKEN) taken+=("$domain") ;;
		*) unknown+=("$domain") ;;
		esac
		sleep "$SLEEP"
	done
done
printf '\r%*s\r' 50 '' >&2 # clear progress line

# --- report ------------------------------------------------------------------
row() { printf '%-24s %s\n' "$1" "$2"; }

echo
row "DOMAIN" "STATUS"
row "------" "------"
for d in "${avail[@]:-}"; do [ -n "$d" ] && row "$d" "AVAILABLE?"; done
for d in "${taken[@]:-}"; do [ -n "$d" ] && row "$d" "TAKEN"; done
for d in "${unknown[@]:-}"; do [ -n "$d" ] && row "$d" "UNKNOWN"; done

echo
echo "${#avail[@]} possibly available, ${#taken[@]} taken, ${#unknown[@]} unknown (of $total)."
echo "Reminder: these checks are indicative only — confirm survivors in a registrar AND check the RENEWAL price (premium domains often hide ~\$90/yr renewals behind a cheap first year)."
