#!/usr/bin/perl
# Parse https://en.wikipedia.org/w/index.php?title=Code_page_437&action=edit&section=3
while(<>) {
    next if !m/^\|{\{/;
    my ($unicode_cp) = m/chset-[^|]+\|([A-F0-9]+)/;
    my ($cp437) = m/(\d+)\}\}/;
    print "$unicode_cp,$cp437\n";
    #print;
}
