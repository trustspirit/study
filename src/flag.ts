type ControlState = {
  flagged: boolean;
  flipCount: number;
};

class ControlLedger {
  private ledger = new Map<string, ControlState>();
  private flagged = 0;
  private sortedCache: string[] | null = null;

  record(id: string): void {
    const entry = this.ledger.get(id) ?? { flagged: false, flipCount: 0 };
    entry.flagged = !entry.flagged;
    entry.flipCount += 1;
    this.ledger.set(id, entry);

    this.flagged += entry.flagged ? 1 : -1;
    this.sortedCache = null;
  }

  isFlagged(id: string): boolean {
    return this.ledger.get(id)?.flagged ?? false;
  }

  flaggedCount(): number {
    return this.flagged;
  }

  flipCount(id: string): number {
    return this.ledger.get(id)?.flipCount ?? 0;
  }

  mostVolatile(n: number): string[] {
    if (this.sortedCache === null) {
      this.sortedCache = [...this.ledger.entries()]
        .sort((a, b) => b[1].flipCount - a[1].flipCount)
        .map(([id]) => id);
    }
    return this.sortedCache.slice(0, n);
  }
}
